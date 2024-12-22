import { Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
          {children}
    </div>
  );
}

export default AuthLayout;
