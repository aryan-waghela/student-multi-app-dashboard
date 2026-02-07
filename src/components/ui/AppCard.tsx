import { Link } from "react-router-dom";
interface AppCardProps {
  title: string;
  desc: string;
  path: string;
}

const AppCard = ({ title, desc, path }: AppCardProps) => {
  return (
    <div className="p-4 bg-orange-100 rounded-2xl flex flex-col justify-between mt-12 gap-8 border-2 hover:-translate-y-1 hover:scale-101 ease-in duration-200">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold h-16">{title}</h2>
        <p className="text-orange-800/70 font-semibold text-lg">{desc}</p>
      </div>
      <Link
        to={path}
        className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-2 text-lg rounded-lg text-center font-semibold"
      >
        Take me there
      </Link>
    </div>
  );
};

export default AppCard;
