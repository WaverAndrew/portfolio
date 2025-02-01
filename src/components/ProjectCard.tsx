import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  tags?: string[];
}

export default function ProjectCard({
  title,
  description,
  image,
  link,
  tags = [],
}: ProjectCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-lg overflow-hidden hover:bg-gray-50 transition-colors border border-gray-100 shadow-sm"
    >
      <div className="aspect-[16/9] relative">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-medium mb-2 text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
