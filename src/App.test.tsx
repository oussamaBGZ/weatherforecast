import { fireEvent, prettyDOM, render, screen, waitFor } from '@testing-library/react'
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let TestApp

describe('weather app tests', () => {
  beforeEach(() => {
    const queryClient = new QueryClient()
    TestApp = () => (
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <App />
      </QueryClientProvider>
    )
    render(<TestApp />);
  })


  test('test the submit form if it returns a correct value', async () => {
    const input = screen.getByPlaceholderText('City name...')
    const form = screen.getByTestId('form')

    fireEvent.change(input, { target: { value: 'tunis' } })
    fireEvent.submit(form)

    await waitFor(() => expect(screen.getByText(/Tunisia, Sunday May 2022/i)).toBeInTheDocument())
  });

})

