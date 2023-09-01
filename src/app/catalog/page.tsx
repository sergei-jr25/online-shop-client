async function getData() {
  const res = await fetch('https://api.example.com/...');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  return res.json();
}
 
// This is an async Server Component
export default async function Page() {
  const data = await getData();
 
  return <main>{/* ... */}</main>;
}