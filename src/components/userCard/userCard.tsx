import imageMan from '/avatar.png'
import './style.css'

const UserCard = (props: {first_name: string}) => {
    return (
        <div className='userCard_container'>
            <img src={imageMan} alt="Иконка человека" className='userCard_image'/>
            <p>{props.first_name}</p>
        </div>
    )
}

export default UserCard