import Card from "@/app/components/ui/Card";
import Image from "next/image";
interface FitnessBlogCardProps {
  key: string;
  title: string;
  description: string;
}
const FitnessBlogCard = ({ title, description, key }: FitnessBlogCardProps) => {
  return (
    <Card key={key} className="ronunded-2xl mb-5">
      <Card.Header>
        <Image
          src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg"
          alt="Dummy fitness image"
          width={600}
          height={300}
          className="rounded-t"
          unoptimized
        />
      </Card.Header>
      <Card.Body>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <span>{description}</span>
        </div>
      </Card.Body>
      <Card.Footer>
        <div className="flex justify-end p-2">
          <button className="bg-secondary-500 text-white px-4 py-2 rounded hover:bg-secondary-600">
            Read More
          </button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default FitnessBlogCard;
