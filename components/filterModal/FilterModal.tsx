'use client';
import Image from 'next/image';
import {Button, CheckboxStatus, DateInput} from '@/components';
import {FilterChevronUp} from '@/public';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import './filterModal.scss';
interface FilterModalProps {
  list: any;
  setFilterModal: Dispatch<SetStateAction<boolean>>;
  payload: any;
  setPayload: Dispatch<SetStateAction<any>>;
  onReset: () => void;
  action: () => void;
}
export default function FilterModal({
  list,
  setFilterModal,
  payload,
  setPayload,
  onReset,
  action,
}: FilterModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [openStates, setOpenStates] = useState<any>({});
  const toggleOpen = (title: string) => {
    setOpenStates((prevOpenStates: any) => ({
      ...prevOpenStates,
      [title]: !prevOpenStates[title],
    }));
  };
  const [prevState, setPrevState] = useState();
  const [isClosed, setIsClosed] = useState(false);
  const handleInputCheckbox = useCallback(
    (name: string, label: string, value: any) => {
      setPayload((prev: any) => {
        const newData = prev[name] ? [...prev[name]] : [];
        const find = newData.find((key) => key.label === label);
        if (!find) {
          newData.push({label, value});
        } else {
          const index = newData.findIndex(
            (item) => item.value === value && item.label === label
          );
          if (index >= -1) newData.splice(index, 1);
        }
        return {...prev, [name]: newData};
      });
    },
    [payload]
  );
  const handleInputChange = useCallback(
    (e: any) => {
      const {value, name} = e.target;
      setPayload((prev: any) => ({...prev, [name]: value}));
    },
    [payload]
  );
  const handleOnClickButton = useCallback(
    (name: string, value: any) => {
      setPayload((prev: any) => ({...prev, [name]: value}));
    },
    [payload]
  );
  const handleInputCheckboxSingle = useCallback(
    (name: string, value: any) => {
      setPayload((prev: any) => {
        return {...prev, [name]: value};
      });
    },
    [payload]
  );
  const handleRenderInput = useCallback(
    (
      type: string,
      label: string,
      name: string,
      currentValue: any,
      value: any
    ) => {
      switch (type) {
        case 'button':
          return (
            <button
              className={`content_sort ${
                currentValue == value ? 'active' : ''
              }`}
              onClick={() => handleOnClickButton(name, value)}
            >
              {label}
            </button>
          );
        case 'date':
          return (
            <div className='content_date'>
              <DateInput
                label={label}
                name={name}
                onChange={(e: any) => handleInputChange(e)}
                value={currentValue}
              />
            </div>
          );
        case 'status_single':
          let containerStatusSingle = 'publish_container';
          if (label === 'Publish' || label === 'Active')
            containerStatusSingle = 'publish_container';
          else if (label === 'Unpublish' || label === 'Inactive')
            containerStatusSingle = 'unpublish_container';
          return (
            <div className='content_status'>
              <CheckboxStatus
                label={label}
                containerClass={containerStatusSingle}
                onChange={() => handleInputCheckboxSingle(name, value)}
                isActive={currentValue == value}
                type={'single'}
              />
            </div>
          );
        case 'status':
          let containerClass = 'publish_container';
          if (label === 'Publish') containerClass = 'publish_container';
          else if (label === 'Unpublish')
            containerClass = 'unpublish_container';
          return (
            <div className='content_status'>
              <CheckboxStatus
                label={label}
                containerClass={containerClass}
                onChange={() => handleInputCheckbox(name, label, value)}
                isActive={currentValue?.find((el: any) => el.label === label)}
              />
            </div>
          );
        default:
          return (
            <button
              className={`content_sort ${
                currentValue == value ? 'active' : ''
              }`}
              onClick={() => handleOnClickButton(name, value)}
            >
              {label}
            </button>
          );
      }
    },
    [payload]
  );
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (payload: any) => {
      let query = '';
      for (const key in payload) {
        if (Object.hasOwnProperty.call(payload, key)) {
          const element = payload[key];
          if (Array.isArray(element)) {
            const labelString = element?.map((item) => item.label).join(',');
            const valueString = element?.map((item) => item.value).join(',');
            query += `${key}_name=${labelString}&`;
            query += `${key}=${valueString}&`;
          } else query += `${key}=${element}&`;
        }
      }

      router.push(pathname + '?' + query);
    },
    [payload]
  );

  return (
    <div>
      <div
        className='overlay'
        id='overlay'
        onClick={() => {
          setTimeout(() => {
            setFilterModal(false);
          }, 500);
          setIsClosed(true);
        }}
      ></div>
      <div className={`filter_modal ${isClosed ? 'inactive' : ''}`} id='modal'>
        <div className='modal_content'>
          <div className='content_ctr'>
            {list.map((item: any) => (
              <div
                className={`content_header ${
                  openStates[item.title] ? 'active' : ''
                }`}
                key={item.title}
              >
                <div
                  className='header_text'
                  onClick={() => toggleOpen(item.title)}
                >
                  {item.title}
                  <Image
                    src={FilterChevronUp}
                    width={14}
                    height={14}
                    alt='filter chevron up'
                    className='header_icon'
                    style={{
                      transform: !openStates[item.title]
                        ? 'rotate(0deg)'
                        : 'rotate(180deg)',
                    }}
                  />
                </div>
                <div
                  className={`content_item ${
                    openStates[item.title] ? 'active' : ''
                  }`}
                >
                  {item.data.map((key: any) =>
                    handleRenderInput(
                      item.type,
                      key.label,
                      key.name,
                      payload[key?.name],
                      key?.value
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className='modal_filter_btn_ctr'>
            <Button
              bgColor={'transparent'}
              borderRadius={'10px'}
              padding='10px 38px'
              color={'#474747'}
              text={'Reset'}
              type='outline'
              borderColor='#DFDFDF'
              width={'100%'}
              onClick={() => {
                onReset();
                setTimeout(() => {
                  setFilterModal(false);
                }, 500);
                setIsClosed(true);
              }}
            />
            <Button
              bgColor={'#474747'}
              borderRadius={'10px'}
              color={'#fff'}
              padding='10px 38px'
              text={'Apply'}
              type='solid'
              width={'100%'}
              onClick={() => {
                createQueryString(payload);
                action();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
