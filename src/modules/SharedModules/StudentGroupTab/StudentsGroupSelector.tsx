import { memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GroupSelectorProps {
  groupNamesList: string[];
  activeGroup: string;
  setActiveGroup: (group: string) => void;
  currentGroupPage: number;
  totalGroupPages: number;
  goToPreviousGroupPage: () => void;
  goToNextGroupPage: () => void;
}

const GroupSelector = memo(
  ({
    groupNamesList,
    activeGroup,
    setActiveGroup,
    currentGroupPage,
    totalGroupPages,
    goToPreviousGroupPage,
    goToNextGroupPage,
  }: GroupSelectorProps) => {
    const groupsPerPage = 8;

    const currentGroups = groupNamesList.slice(
      currentGroupPage * groupsPerPage,
      (currentGroupPage + 1) * groupsPerPage
    );

    return (
      <div className="flex items-center gap-2 mb-4 overflow-x-auto sm:overflow-visible px-2">
        {groupNamesList.length > groupsPerPage && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0 shrink-0"
            onClick={goToPreviousGroupPage}
            disabled={currentGroupPage === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        <div className="flex gap-2 overflow-x-auto sm:overflow-visible sm:flex-wrap scrollbar-hide">
          {currentGroups.map((group) => (
            <Button
              key={group}
              variant="outline"
              size="sm"
              onClick={() => setActiveGroup(group)}
              className={`px-3 py-1 text-xs rounded-full h-7 shrink-0 transition-colors duration-200 ${activeGroup === group
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black'
                }`}
            >
              {group}
            </Button>
          ))}
        </div>

        {groupNamesList.length > groupsPerPage && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0 shrink-0"
            onClick={goToNextGroupPage}
            disabled={currentGroupPage >= totalGroupPages - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }
);

GroupSelector.displayName = 'GroupSelector';

export default GroupSelector;
