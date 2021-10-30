import MainApp from 'pages/mainApp';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import Footer from 'shared/components/atoms/footer/Footer';
import AntDDrawer from 'shared/components/organisms/drawer/Drawer';
import AntDModal from 'shared/components/organisms/modal/Modal';

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <React.Fragment>
        <BrowserRouter>
          <MainApp />
        </BrowserRouter>
        <Footer />
        <AntDDrawer />
        <AntDModal />
      </React.Fragment>
    </QueryClientProvider>
  );
};

export default App;
