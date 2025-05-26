import pandas as pd

# Load CSV
file_path = '/Users/sofo/dev/projects/portfolio/sql/US_Baby_Names/names_data.csv'

# Read with pandas
df = pd.read_csv(file_path, on_bad_lines='skip', dtype=str, header=0)
df.columns = ['state', 'gender', 'year', 'name', 'births']
print("Columns loaded from CSV:")
print(df.columns.tolist())

# Show number of loaded rows (to compare with total)
print(f"Rows loaded: {len(df)}")

# Convert data types
df['year'] = df['year'].astype(int)
df['births'] = df['births'].astype(int)

# Save to clean CSV
clean_path = '/Users/sofo/dev/projects/portfolio/sql/US_Baby_Names/names_data_clean.csv'
df.to_csv(clean_path, index=False)

print(f"✅ Clean file saved to: {clean_path}")
