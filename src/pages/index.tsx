import MainLayout from '@/components/layout/MainLayout';
import { fetchPeopleData } from '@/utils/getServerSideQuery';
import { ApiResponse } from '@/utils/types';
import { GetServerSideProps } from 'next';

interface HomeProps {
  data?: ApiResponse;
}

export default function Home({ data }: HomeProps) {
  return <MainLayout serverData={data} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return fetchPeopleData({
    url: 'http://localhost:3000/api/people',
    notFoundOnError: true,
  });
};
