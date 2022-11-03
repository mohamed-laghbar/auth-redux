import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.error('Successfully toasted!')


const Index = () => {
  return (
    <div>
      <button onClick={notify}>Make me a toast</button>
   
    </div>
  );
};
export default Index