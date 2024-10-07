import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from './../firebaseConfig'; // Asegúrate de que esto apunte a tu archivo de configuración

const auth = getAuth(firebase);

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario registrado: ", userCredential.user);
      // Opcional: Redirigir a otra página o mostrar mensaje de éxito
    } catch (error: any) {
      setError(error.message);
      console.error("Error al registrar el usuario: ", error.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Registrar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra mensaje de error */}
    </form>
  );
};

export default Register;
