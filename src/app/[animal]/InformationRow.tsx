export default function InformationRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <li className="flex flex-col">
      <span className="font-semibold text-sm">{label}</span>
      <span className="text-primary-700">{value}</span>
    </li>
  );
}
