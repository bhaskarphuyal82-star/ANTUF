'use client';

import { Box, Container } from '@mui/material';
import UserManagement from '@/components/admin/user/UserManagement';

export default function AllUserPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box>
        <UserManagement />
      </Box>
    </Container>
  );
}
