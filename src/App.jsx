import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import axios from "axios";

export default function App() {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setTimeout(() => setIsLoading(false), 2000);
        setUser(jsonData);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    };

    fetchData();
    // axios
    //   .get("https://jsonplaceholder.typicode.com/users")
    //   //.then((res) => {setUser(res.data); })
    //   .then(({ data }) => setUser(data))
    //   .catch((error) => console.error(error));
  }, []);
  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <div className="App">
      <h3 className="text-primary">User List</h3>
      <Table
        variant="info"
        striped
        bordered
        hover
        className="shadow-lg text-center"
      >
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>UserName</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {user?.length > 0 &&
            user.map((userData) => {
              return (
                <tr key={userData.id}>
                  <td>{userData.id}</td>
                  <td>{userData.name}</td>
                  <td>{userData.username}</td>
                  <td>{userData.email}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}
