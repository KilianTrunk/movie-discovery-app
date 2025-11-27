'use client';

import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Container } from '@/components/ui/Container';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <Container>
        <ErrorMessage
          title="Page Not Found"
          message="Sorry, we couldn't find the page you're looking for. It might have been moved or the link might be incorrect."
        />
      </Container>
    </div>
  );
}

