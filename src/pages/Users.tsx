import { useNavigate } from "react-router-dom";
import useUsers from "../hooks/useUsers";
import { db, doc, setDoc } from "../firebase";
import {
  CustomYesNoAlert,
  CustomResponseAlert,
} from "../components/CustomAlert";
import { User } from "../models/users.model";

const Users = () => {
  const navigate = useNavigate();
  const { users } = useUsers();

  const handleDelete = async (dbUser: User) => {
    const user = doc(db, "users", dbUser.id);

    CustomYesNoAlert(
      "¿Estás seguro?",
      "Una vez eliminado, no podrás recuperar este usuario",
      "warning"
    ).then((result) => {
      if (result.isConfirmed) {
        setDoc(
          user,
          {
            ...dbUser,
            active: false,
          },
          { merge: true }
        )
          .then(() => {
            CustomResponseAlert(
              "¡Eliminado!",
              "El usuario ha sido eliminado correctamente",
              "success"
            );
          })
          .then(() => {
            navigate("/users");
          });
      }
    });
  };

  return (
    <div className="flex flex-col">
      <button
        onClick={() => navigate("/add/users")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-8 rounded w-[300px]"
      >
        Agregar Usuario
      </button>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr className="border-t-2">
                  <th scope="col" className="px-6 py-4 ">
                    Imagen
                  </th>
                  <th scope="col" className="px-6 py-4 ">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Apellido
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Usuario
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Rol
                  </th>

                  <th scope="col" className="px-6 py-4">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={user.image}
                        alt="user"
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {user.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user.lastName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user.username}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">{user.role}</td>

                    <td className="whitespace-nowrap px-6 py-4">
                      <button
                        onClick={() => navigate("/edit/users", { state: user })}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(user)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
