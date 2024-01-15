import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from 'react-query';
import Router from "./Router/router";



const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <Router />
  </QueryClientProvider>
);
