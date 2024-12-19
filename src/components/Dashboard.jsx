import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter 
} from '../components/ui/card';

// Example usage:
function Dashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard Overview</CardTitle>
        <CardDescription>View your stats and recent activity</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Your content here */}
      </CardContent>
      <CardFooter>
        {/* Footer content */}
      </CardFooter>
    </Card>
  );
}

export default Dashboard; 