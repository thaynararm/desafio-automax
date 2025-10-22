import { useEffect, useState } from "react";
import {
  Button,
  DivCarts,
  Dropdown,
  DropdownContent,
  DropdownHeader,
  Input,
  Table,
  Title,
} from "./syled";
import { FaChevronDown } from "react-icons/fa";

interface Cart {
  id: number;
  userId: number;
  date: string;
  products: Product[];
}

interface Product {
  id: number;
  productId: number;
  quantity: number;
}

export default function CartList() {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [openCartId, setOpenCartId] = useState<number | null>(null);
  const [userIdFilter, setUserIdFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCarts = async (userId?: string) => {
    const url = userId
      ? `http://127.0.0.1:8000/carts/${userId}`
      : "http://127.0.0.1:8000/carts";

    fetch(url)
      .then(async (res) => {
        if (!res.ok) throw new Error("Erro ao buscar dados");
        const data = await res.json();
        setCarts(Array.isArray(data) ? data : [data]);
      })
      .catch((err) => {
        console.error(err);
        setCarts([]);
      })
      .finally();
  };

  const fetchLoadCarts = async () => {
    const url = "http://127.0.0.1:8000/load-carts";
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Erro ao buscar dados");
      await res.json();
      await fetchCarts(userIdFilter.trim() || undefined);
    } catch (err) {
      console.error(err);
      setCarts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  const handleFilter = async () => {
    if (userIdFilter.trim()) {
      fetchCarts(userIdFilter.trim());
    } else {
      fetchCarts();
    }
  };

  const handleCarts = async () => {
    fetchLoadCarts();
  };

  const toggleCart = (id: number) => {
    setOpenCartId(openCartId === id ? null : id);
  };

  return (
    <DivCarts>
      <Title>Carrinhos</Title>

      <div style={{ marginBottom: "30px", display: "flex", gap: "10px" }}>
        <Input
          type="number"
          placeholder="Filtrar por User ID"
          value={userIdFilter}
          onChange={(e) => setUserIdFilter(e.target.value)}
        ></Input>
        <Button onClick={handleFilter}>Filtrar</Button>
        <Button onClick={handleCarts}>Atualizar Lista</Button>
      </div>

      {loading && (
        <div style={{ margin: "20px 0", textAlign: "center" }}>
          🔄 Carregando...
        </div>
      )}

      {!loading &&
        carts.map((cart) => (
          <Dropdown key={cart.id}>
            <DropdownHeader onClick={() => toggleCart(cart.id)}>
              <div>
                <p>User {cart.userId}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <p style={{ paddingRight: "20px" }}>
                  {new Date(cart.date).toLocaleDateString()}
                </p>
                <p>
                  <FaChevronDown
                    style={{
                      marginLeft: "auto",
                      transition: "transform 0.3s",
                      transform:
                        openCartId === cart.id
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                    }}
                  />
                </p>
              </div>
            </DropdownHeader>
            <DropdownContent open={openCartId === cart.id}>
              <Table>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.products.map((p) => (
                    <tr key={p.id}>
                      <td>{p.productId}</td>
                      <td>{p.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </DropdownContent>
          </Dropdown>
        ))}
    </DivCarts>
  );
}
