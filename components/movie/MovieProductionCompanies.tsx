import Image from 'next/image';
import { ProductionCompany } from '@/types/movie';
import { getImageUrl } from '@/utils/image';

interface MovieProductionCompaniesProps {
  companies: ProductionCompany[];
}

export function MovieProductionCompanies({ companies }: MovieProductionCompaniesProps) {
  if (companies.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Production</h2>
      <div className="space-y-2">
        {companies.map((company) => (
          <div key={company.id} className="flex items-center gap-3">
            {company.logo_path && (
              <Image
                src={getImageUrl(company.logo_path, 'w200')!}
                alt={company.name}
                width={40}
                height={40}
                className="rounded bg-white p-1"
              />
            )}
            <div>
              <p className="font-medium">{company.name}</p>
              <p className="text-sm text-gray-400">{company.origin_country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
