import { useContext, useEffect, useRef, useState } from 'react';
import Navbar from "../../../components/NavbarDonor/NavbarDonor";
import './ChangePassword.css';
import { AuthContext } from '../../../contexts/Auth/AuthContext';

const ChangePassword = () => {
    const auth = useContext(AuthContext);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordChanged, setPasswordChanged] = useState(false);

    const newPasswordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const oldPasswordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (newPassword !== '' && confirmPassword !== '') {
            setPasswordsMatch(newPassword === confirmPassword);
        }
    }, [newPassword, confirmPassword]);

    const handleChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };

    const handleChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const confirmPasswordValue = e.target.value;
        setConfirmPassword(confirmPasswordValue);
    };

    const handleChangeOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOldPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(newPasswordRef.current!.value !== confirmPasswordRef.current!.value){
            confirmPasswordRef.current!.focus();
        }else if(oldPasswordRef.current!.value !== auth.user!.password){
            oldPasswordRef.current!.focus();
        }else{
            auth.user!.password = newPassword;
            auth.updateDonor(auth.user!);
            setPasswordChanged(true);
            setNewPassword('');
            setConfirmPassword('');
            setOldPassword('');
            localStorage.setItem('user', JSON.stringify(auth.user!));
        }
    };

    return (
        <div className="change-password-container">
            <Navbar />
            <div style={{minHeight: "71.5vh", textAlign:"center", marginTop: "5%"}}>
                <span>Alterar Senha</span>
                <div className="change-password-content">
                    <form onSubmit={handleSubmit} className='change-password-form'>
                        <label htmlFor="newPassword">Nova Senha:</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={handleChangeNewPassword}
                            required
                            ref={newPasswordRef}
                        />

                        <label htmlFor="confirmPassword">Confirmar Nova Senha:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChangeConfirmPassword}
                            required
                            ref={confirmPasswordRef}
                            className={!passwordsMatch && confirmPassword !== '' ? 'error' : (newPassword === '' || confirmPassword === '' ? '' : 'success')}
                        />

                        <label htmlFor="oldPassword">Senha Antiga:</label>
                        <input
                            type="password"
                            id="oldPassword"
                            value={oldPassword}
                            onChange={handleChangeOldPassword}
                            ref={oldPasswordRef}
                            required
                        />

                        <button type="submit">Alterar Senha</button>
                        {passwordChanged && <p>Senha alterada com sucesso!</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
