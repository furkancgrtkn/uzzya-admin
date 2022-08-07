import { FC, ReactElement, useRef, useState } from 'react';
import { faClose, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useOnClickOutside } from 'usehooks-ts';
import Button from '../Button';

interface ActionButtonProps {
  actions: {
    id: number;
    event: () => void;
    icon: ReactElement<any, any>;
    label: string;
  }[];
}

const ActionButton: FC<ActionButtonProps> = ({ actions }) => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef(null);

  const handleClickOutside = () => {
    setOpen(false);
  };
  useOnClickOutside(ref, handleClickOutside);

  return (
    <div ref={ref} className="fixed flex bottom-4 right-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-brand-green"
      >
        <FontAwesomeIcon
          icon={open ? faClose : faEllipsis}
          className="w-4 h-4 text-white"
        />
      </button>
      {open && (
        <ul className="absolute animate-enterActionBox origin-bottom-right right-0 min-w-[220px] p-3 space-y-2 bg-white border rounded  border-slate-400  bottom-12">
          {actions.map((action: any) => (
            <li key={action.id}>
              <Button
                className="w-full bg-slate-100 lg:hover:bg-slate-200"
                onClick={() => action.event()}
              >
                {action.icon}
                <span className="text-slate-800">{action.label}</span>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActionButton;
