import React from 'react';
import { prettyDOM, render, screen, waitFor } from '@testing-library/react'
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

test('renders learn react link', async () => {
  const queryClient = new QueryClient()
  const TestApp = () => (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <App />
    </QueryClientProvider>
  )
  render(<TestApp />);
  await waitFor(() => expect(screen.getByText(/10/i)).toBeInTheDocument())
  console.log(prettyDOM(screen.getByText(/10/i)))

});
