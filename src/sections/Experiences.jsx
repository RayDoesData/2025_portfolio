import { div } from 'motion/react-client'
import { Timeline } from '../components/Timeline'
import { experiences } from "../contstants";


const Experiences = () => {
  return (
    <div className="w-full overflow-hidden">
        <Timeline data={experiences} />
    </div>
  )
}

export default Experiences