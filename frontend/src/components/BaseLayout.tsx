import type { ReactNode } from "react";
import { Container, Footer, Header, Main } from "./syled";

interface BaseLayoutProps {
  children: ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <Container>
      <Header>
        <h1>Automax</h1>
      </Header>

      <Main>{children}</Main>

      <Footer>© 2025 Automax</Footer>
    </Container>
  );
}
