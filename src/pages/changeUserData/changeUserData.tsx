import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { dataChanges, IUserSlices } from "../../store/slices/usersSlices"
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import UserCard from "../../components/userCard/userCard"
import './style.css'

const ChangeUserData = () => {

    const [selectUser, setSelectUser] = useState<IUserSlices | null>(null)
    const [firstName, setFirstName] = useState<string | undefined>("");
    const [lastName, setLastName] = useState<string | undefined>("");
    const [age, setAge] = useState<number | undefined>(undefined);
    const [email, setEmail] = useState<string | undefined>("");

    const store = useSelector((state: RootState) => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        if (selectUser) {
          setFirstName(selectUser.first_name);
          setLastName(selectUser.last_name);
          setAge(selectUser.age);
          setEmail(selectUser.email);
        }
    }, [selectUser]);
    
    const handleSave = useCallback(() => {
        if (selectUser) {
            const data = {
                id: selectUser.id,
                first_name: firstName,
                last_name: lastName,
                age,
                email,
            } as IUserSlices;
            dispatch(dataChanges({ id: selectUser.id, data }));
        }
    }, [selectUser, firstName, lastName, age, email, dispatch]);

    const userList = useMemo(
        () =>
            store.map((el) => (
                <span key={el.id} onClick={() => setSelectUser(el)}>
                    <UserCard first_name={el.first_name} />
                </span>
            )),
        [store]
    );

    return (
        <div className="changeUserData_container">
            <div className="changeUserData_userList">
               {userList}
            </div>
            {
                selectUser && 
                    <div className="changeUserData_userChange">
                        <div className="changeUserData_userChange_header">
                            <h1>{firstName} {lastName}</h1>
                        </div>
                        <div className="changeUserData_userChange_dataChange">
                            <span className="changeUserData_input_wrap">
                                <label htmlFor="first_name">Имя:</label>
                                <input 
                                    value={firstName} 
                                    onChange={el => setFirstName(el.target.value)} 
                                    type="text" id="first_name" 
                                    className="changeUserData_input" 
                                    placeholder="Имя"
                                />
                            </span>
                            <span className="changeUserData_input_wrap">
                                <label htmlFor="last_name">Фамилия:</label>
                                <input 
                                    value={lastName} 
                                    onChange={el => setLastName(el.target.value)} 
                                    type="text" id="last_name" 
                                    className="changeUserData_input" 
                                    placeholder="Фамилия"
                                />
                            </span>
                            <span className="changeUserData_input_wrap">
                                <label htmlFor="age">Возраст:</label>
                                <input 
                                    value={age} 
                                    onChange={el => setAge(parseInt(el.target.value))} 
                                    type="text" id="age" 
                                    className="changeUserData_input" 
                                    placeholder="Возраст"
                                />
                            </span>
                            <span className="changeUserData_input_wrap">
                                <label htmlFor="last_name">Почта:</label>
                                <input 
                                    value={email} 
                                    onChange={el => setEmail(el.target.value)} 
                                    type="text" id="email" 
                                    className="changeUserData_input" 
                                    placeholder="Почта"
                                />
                            </span>
                        </div>
                        <button onClick={handleSave} className="changeUserData_button">Сохранить</button>
                    </div>
            }
        </div>
    )
}

export default memo(ChangeUserData)