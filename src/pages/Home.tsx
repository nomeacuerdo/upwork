import { useEffect, type ReactElement } from 'react';
export default function HomePage(): ReactElement {
  useEffect(() => {
    async function getData() {
      // Add a fake delay to make waiting noticeable.
      await new Promise(resolve => {
        console.log('bloop')
        setTimeout(resolve, 30000);
      });
    };

    getData();
  }, []);

  return (
    <div className='home'>
      <h1>Home</h1>
    </div>
  );
}
