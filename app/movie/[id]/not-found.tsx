import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Container } from '@/components/ui/Container';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <Container>
        <ErrorMessage
          title="Movie Not Found"
          message="Sorry, we couldn't find the movie you're looking for. It might have been removed or the link might be incorrect."
          action={{ label: 'Back to Movies', onClick: () => {} }}
        />
      </Container>
    </div>
  );
}
