import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import {getCrewMembers} from '../api/getCrewMembers';
import { CrewMembersProps } from '@/types/crew/crew';
import Image from 'next/image';
import crewLeader from '$/images/crewLeader.png';

type MemberListProps = {
  crewId: number;
  setIsMemberListClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

function MemberList({ setIsMemberListClicked, crewId }: MemberListProps) {
  const [crewMembers, setCrewMembers] = useState<CrewMembersProps[]>([]);
  useEffect(() => {
    const fetchCrewMembers = async () => {
      try {
        const response = await getCrewMembers(crewId);
        if (response) {
          setCrewMembers(response);
        }
      } catch (error) {
        console.error('Failed to fetch crew members:', error);
      }
    };

    fetchCrewMembers();
  }, [crewId]);

  const sortedCrewMembers = [...crewMembers].sort((a, b) => {
    if (a.is_crew_creator && !b.is_crew_creator) {
      return -1;
    } else if (!a.is_crew_creator && b.is_crew_creator) {
      return 1;
    }
    return 0;
  });

  return (
    <div className="h-dvh">
      <header className="sticky top-0 flex items-center justify-center h-12 bg-white z-10 relative">
        <button
          type="button"
          onClick={() => {
            setIsMemberListClicked(false);
          }}
          className={'absolute left-4'}
        >
          <ChevronLeft />
        </button>
        크루원 목록
      </header>
      <ul className="p-[16px] flex flex-col gap-[20px]">
        {sortedCrewMembers &&
          sortedCrewMembers.map(member => (
            <li key={member.id} className="list-none">
              <div className="flex w-full h-fit gap-[10px]">
                <div className="size-[40px] relative shrink-0">
                  <Image
                    src={member.profile_image}
                    alt="크루 멤버 프로필 이미지"
                    fill={true}
                    className="rounded-full my-auto"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-medium flex items-center">
                    {member.is_crew_creator && (
                      <div className="relative size-[18px] mr-[6px]">
                        <Image src={crewLeader} fill={true} alt="크루장" />
                      </div>
                    )}
                    {member.nickname}
                  </span>
                  <span className="text-[#C4C4C4] text-sm line-clamp-1">
                    안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
                  </span>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default MemberList;
