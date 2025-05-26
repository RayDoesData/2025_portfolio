CREATE TABLE names (
    state CHAR(2),
    gender CHAR(1),
    year INT,
    name VARCHAR(255),
    births INT
);

CREATE TABLE regions (
    State CHAR(2),
    Region VARCHAR(45)
    );


-- LOAD DATA WITH \copy FROM TERMINAL

-- 1. CONNECT TO PORTFOLIO
psql - h localhost - U postgres - d portfolio

-- 2. READ FILE FROM MACOS TO WRITE INTO NAMES TABLE
\ copy names(state, gender, year, name, births)
FROM '/Users/sofo/dev/projects/portfolio/sql/US_Baby_Names/names_data_clean.csv' DELIMITER ',' CSV HEADER;

-- 3. ERROR RECEIVED FROM TERMINAL
ERROR: unquoted newline found in data HINT: Use quoted CSV field to represent newline.CONTEXT: COPY names,
line 611307 
    PROBLEM: CSV FIELD HAS A LINE BREAK BUT VALUE WAS NOT IN QUOTES
    SOLUTION: USE PYTHON TO CLEAN, FORMAT & IMPORT * SEE clean_names_data.py

-- 4. RUN PYTHON FILE USING TERMINAL
python3 / Users / sofo / dev / projects / portfolio / sql / US_Baby_Names / clean_names_data.py

-- 5. LOAD NEW/CLEAN CSV INTO POSTGRES
\copy names
FROM '/Users/sofo/dev/projects/portfolio/sql/US_Baby_Names/names_data_clean.csv' DELIMITER ',' CSV HEADER;


INSERT INTO regions
VALUES 
    ('AL', 'South'),
    ('AK', 'Pacific'),
    ('AZ', 'Mountain'),
    ('AR', 'South'),
    ('CA', 'Pacific'),
    ('CO', 'Mountain'),
    ('CT', 'New_England'),
    ('DC', 'Mid_Atlantic'),
    ('DE', 'South'),
    ('FL', 'South'),
    ('GA', 'South'),
    ('HI', 'Pacific'),
    ('ID', 'Mountain'),
    ('IL', 'Midwest'),
    ('IN', 'Midwest'),
    ('IA', 'Midwest'),
    ('KS', 'Midwest'),
    ('KY', 'South'),
    ('LA', 'South'),
    ('ME', 'New_England'),
    ('MD', 'South'),
    ('MA', 'New_England'),
    ('MI', 'Midwest'),
    ('MN', 'Midwest'),
    ('MS', 'South'),
    ('MO', 'Midwest'),
    ('MT', 'Mountain'),
    ('NE', 'Midwest'),
    ('NV', 'Mountain'),
    ('NH', 'New_England'),
    ('NJ', 'Mid_Atlantic'),
    ('NM', 'Mountain'),
    ('NY', 'Mid_Atlantic'),
    ('NC', 'South'),
    ('ND', 'Midwest'),
    ('OH', 'Midwest'),
    ('OK', 'South'),
    ('OR', 'Pacific'),
    ('PA', 'Mid_Atlantic'),
    ('RI', 'New_England'),
    ('SC', 'South'),
    ('SD', 'Midwest'),
    ('TN', 'South'),
    ('TX', 'South'),
    ('UT', 'Mountain'),
    ('VT', 'New_England'),
    ('VA', 'South'),
    ('WA', 'Pacific'),
    ('WV', 'South'),
    ('WI', 'Midwest'),
    ('WY', 'Mountain');



Objective 1: Track changes in name popularity 

-- Find the overall most popular girl and boy names and show how they have changed in popularity rankings over the years
    WITH total_births AS (
        SELECT gender,
            name,
            SUM(births) AS total_births
        FROM names
        GROUP BY gender,
            name
    ),
    top_names AS (
        SELECT gender,
            name
        FROM (
                SELECT gender,
                    name,
                    RANK() OVER (
                        PARTITION BY gender
                        ORDER BY SUM(births) DESC
                    ) AS name_rank
                FROM names
                GROUP BY gender,
                    name
            ) ranked_names
        WHERE name_rank = 1
    ),
    yearly_ranks AS (
        SELECT year,
            gender,
            name,
            births,
            RANK() OVER (
                PARTITION BY gender,
                year
                ORDER BY births DESC
            ) AS rank_in_year
        FROM names
    )
    SELECT yr.year,
        yr.gender,
        yr.name,
        yr.births,
        yr.rank_in_year
    FROM yearly_ranks yr
        JOIN top_names tn ON yr.gender = tn.gender
        AND yr.name = tn.name
    ORDER BY yr.gender,
        yr.year;

--Find the names with the biggest jumps (increase) in popularity from the first year of the data set to the last year
    WITH yearly_totals AS (
        SELECT year,
            name,
            gender,
            SUM(births) AS total_births
        FROM names
        GROUP BY year,
            name,
            gender
    ),
    first_last_years AS (
        SELECT name,
            gender,
            MAX(
                CASE
                    WHEN year = (
                        SELECT MIN(year)
                        FROM names
                    ) THEN total_births
                    ELSE 0
                END
            ) AS first_year_births,
            MAX(
                CASE
                    WHEN year = (
                        SELECT MAX(year)
                        FROM names
                    ) THEN total_births
                    ELSE 0
                END
            ) AS last_year_births
        FROM yearly_totals
        GROUP BY name,
            gender
    ),
    popularity_change AS (
        SELECT name,
            gender,
            first_year_births,
            last_year_births,
            last_year_births - first_year_births AS change_in_births
        FROM first_last_years
    )
    SELECT *
    FROM popularity_change
    ORDER BY ABS(change_in_births) DESC
    LIMIT 10;


Objective 2: Compare popularity across decades 

-- For each year, return the 3 most popular girl names and 3 most popular boy names
    WITH ranked_names AS (
        SELECT
            year,
            gender,
            name,
            SUM(births) AS total_births,
            RANK() OVER (
                PARTITION BY year, gender 
                ORDER BY SUM(births) DESC
             ) AS name_rank
        FROM names
        GROUP BY year, gender, name
    )

    SELECT
        year,
        gender,
        name,
        total_births,
        name_rank
    FROM ranked_names
    WHERE name_rank <= 3
    ORDER BY year, gender, name_rank;

-- For each decade, return the 3 most popular girl names and 3 most popular boy names
    WITH ranked_names_by_decade AS (
        SELECT
            (year / 10) * 10 AS decade,
            gender,
            name,
            SUM(births) AS total_births,
            RANK() OVER (
                PARTITION BY (year / 10) * 10, gender
                ORDER BY SUM(births) DESC
            ) AS name_rank
        FROM names
        GROUP BY decade, gender, name
    )

    SELECT
        decade,
        gender,
        name,
        total_births,
        name_rank
    FROM ranked_names_by_decade
    WHERE name_rank <= 3
    ORDER BY decade, gender, name_rank;


Objective 3: Compare popularity across regions

-- Return the number of babies born in each of the six regions
    SELECT
        r.region,
        SUM(n.births) AS total_births
    FROM
        names n
    JOIN
        regions r ON n.state = r.state
    GROUP BY
        r.region
    ORDER BY
        total_births DESC;

-- Return the 3 most popular girl names and 3 most popular boy names within each region
    WITH ranked_names AS (
        SELECT
            r.region,
            n.gender,
            n.name,
            SUM(n.births) AS total_births,
            RANK() OVER (
                PARTITION BY r.region, n.gender
                ORDER BY SUM(n.births) DESC
            ) AS name_rank
        FROM
            names n
        JOIN
            regions r ON n.state = r.state
        GROUP BY
            r.region, n.gender, n.name
    )

    SELECT
        region,
        gender,
        name,
        total_births,
        name_rank
    FROM
        ranked_names
    WHERE
        name_rank <= 3
    ORDER BY
        region, gender, name_rank;


Objective 4: Explore unique names

-- Find the 10 most popular androgynous names
    WITH gender_totals AS (
        SELECT 
            name,
            gender,
            SUM(births) AS total_births
        FROM names
        GROUP BY name, gender
    ),
    pivoted AS (
        SELECT
            name,
            MAX(CASE WHEN gender = 'F' THEN total_births ELSE 0 END) AS female_births,
            MAX(CASE WHEN gender = 'M' THEN total_births ELSE 0 END) AS male_births
        FROM gender_totals
        GROUP BY name
    ),
    androgynous_names AS (
        SELECT 
            name,
            female_births,
            male_births,
            female_births + male_births AS total_births,
            ABS(female_births - male_births) AS gender_gap
        FROM pivoted
        WHERE female_births > 0 AND male_births > 0
    )
    SELECT 
        name,
        female_births,
        male_births,
        total_births,
        gender_gap
    FROM androgynous_names
    ORDER BY gender_gap ASC, total_births DESC
    LIMIT 10;

-- Find the length of the shortest and longest names, and identify the most popular short names and long names
    WITH name_lengths AS (
        SELECT
            name,
            gender,
            LENGTH(name) AS name_length,
            SUM(births) AS total_births
        FROM names
        GROUP BY name, gender
    ),

    length_extremes AS (
        SELECT 
            MIN(name_length) AS shortest,
            MAX(name_length) AS longest
        FROM name_lengths
    ),

    popular_extreme_names AS (
        SELECT 
            nl.name,
            nl.gender,
            nl.total_births,
            nl.name_length
        FROM name_lengths nl
        JOIN length_extremes le 
            ON nl.name_length = le.shortest OR nl.name_length = le.longest
    )

    SELECT *
    FROM popular_extreme_names
    ORDER BY name_length, total_births DESC;

-- The founder of Maven Analytics is named Chris. Find the state with the highest percent of babies named "Chris"
    WITH state_totals AS (
        SELECT 
            state,
            SUM(births) AS total_births
        FROM names
        GROUP BY state
    ),
    chris_counts AS (
        SELECT 
            state,
            SUM(births) AS chris_births
        FROM names
        WHERE name = 'Chris'
        GROUP BY state
    ),
    chris_percentages AS (
        SELECT 
            st.state,
            cc.chris_births,
            st.total_births,
            ROUND((cc.chris_births::DECIMAL / st.total_births) * 100, 5) AS chris_percentage
        FROM state_totals st
        JOIN chris_counts cc ON st.state = cc.state
    )
    SELECT 
        state,
        chris_births,
        total_births,
        chris_percentage
    FROM chris_percentages
    ORDER BY chris_percentage DESC
    LIMIT 1;






























