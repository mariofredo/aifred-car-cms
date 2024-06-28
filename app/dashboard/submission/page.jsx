'use client';
import {useState, useEffect, useCallback} from 'react';
import {DefaultContainer, Table, TablePagination} from '@/components';
import Cookies from 'js-cookie';
import '@/styles/submission.scss';
import Link from 'next/link';
import {formatCompleteDate} from '@/utils';

export default function page() {
  const [pagination, setPagination] = useState({
    limit: 10,
    currentPage: 1,
    totalCount: 0,
  });

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get('token_aifred_neo_cms');

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/submission?page=${pagination.currentPage}&limit=${pagination.limit}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data.data);
        setPagination((prev) => ({
          ...prev,
          totalCount: data.total_data,
        }));
      } else {
        console.error('Failed to fetch data:', response.status);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSubmission = async (unique_id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/submission/delete`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({id: unique_id}),
        }
      );
      if (response.ok) {
        console.log('Submission deleted successfully');
        // Remove the deleted submission from the state
        setSubmissions((prevSubmissions) =>
          prevSubmissions.filter(
            (submission) => submission.unique_id !== unique_id
          )
        );
        // Optionally, refetch the data
        fetchData();
      } else {
        console.error(
          'Failed to delete submission:',
          response.status,
          await response.text()
        );
      }
    } catch (error) {
      console.error('Failed to delete submission:', error);
    }
  };

  const handleRenderCompleteStatus = useCallback((status) => {
    switch (status) {
      case 'complete':
        return (
          <div>
            <p className='complete_text'>Complete</p>
          </div>
        );
      case 'not complete':
        return (
          <div>
            <p className='not_complete_text'>Not Complete</p>
          </div>
        );
      default:
        return '-';
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [pagination.currentPage, pagination.limit]);

  return (
    <div className='flex flex-col gap-[15px]'>
      <DefaultContainer title={'Submission'} />
      {/* To Be Done */}
      {/* <div className='flex gap-[23px]'>
        <Select label={'SERIES'} />
        <Select label={'VARIANT'} />
      </div> */}
      <div className='submission_container'>
        <p className='submission_table_header'>Submission List</p>
        <div className='submission_table_ctrs'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Table
              listTitle={[
                'Unique ID',
                'Brand',
                'Date Submitted',
                'Duration',
                'Status',
                'Name',
                'Email',
                'Action',
              ]}
              data={submissions.map((submission) => ({
                unique_id: submission.unique_id,
                brand_name: submission.brand_name,
                created_at: formatCompleteDate(submission.created_at),
                duration: submission.duration,
                complete_status: handleRenderCompleteStatus(
                  submission.complete_status
                ),
                name: submission.name,
                email: submission.email,
                action: (
                  <>
                    <Link
                      href={`/dashboard/submission/detail/${submission.unique_id}`}
                    >
                      <button className='purple_btn'>Details</button>
                    </Link>
                    <button
                      className='red_btn'
                      onClick={() => deleteSubmission(submission.unique_id)}
                    >
                      Delete
                    </button>
                  </>
                ),
              }))}
              listKey={[
                'unique_id',
                'brand_name',
                'created_at',
                'duration',
                'complete_status',
                'name',
                'email',
                'action',
              ]}
              type={'submission'}
              subType='submission'
              productId={null}
            />
          )}
        </div>
        {!loading && (
          <TablePagination
            pagination={pagination}
            setPagination={setPagination}
            limit={pagination.limit}
          />
        )}
      </div>
    </div>
  );
}
