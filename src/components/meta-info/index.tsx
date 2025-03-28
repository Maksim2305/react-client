import type { IconType } from 'react-icons';

type Props = {
  count: number;
  Icon: IconType;
  onClick?: () => void;
};

const MetaInfo: React.FC<Props> = ({ count, Icon, onClick }) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={onClick}>
      {count > 0 && (
        <p className="font-semibold text-default-400 text-l">{count}</p>
      )}
      <p className="text-default-400 text-xl hover:text-2xl ease-in duration-100">
        <Icon />
      </p>
    </div>
  );
};

export default MetaInfo;
