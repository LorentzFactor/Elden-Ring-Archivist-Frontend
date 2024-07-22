import { redirect } from '@remix-run/node'

// Redirect to search
export const loader = async () => {return redirect('/search')};

const Index = () => {};

export default Index;
