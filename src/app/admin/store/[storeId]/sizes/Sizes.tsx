'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { DataTable } from '@/components/ui/data-table/DataTable';
import DataTableLoading from '@/components/ui/data-table/DataTableLoading';

import { STORE_URL } from '@/config/url.config';

import styles from '../Store.module.scss';

import { ISizeColumn, SizeColumns } from './SizeColumns';
import { useGetSizes } from '@/hooks/queries/sizes/useGetSizes';

export function Sizes() {
  const params = useParams<{ storeId: string }>();

  const { sizes, isLoading } = useGetSizes();

  const formattedSizes: ISizeColumn[] = sizes
    ? sizes.map(size => ({
        id: size.id,
        value: size.value,
      }))
    : [];

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <DataTableLoading />
      ) : (
        <>
          <div className={styles.header}>
            <Heading
              title={`Sizes (${sizes?.length})`}
              description="Manage all sizes in your store"
            />
            <div className={styles.buttons}>
              <Link href={STORE_URL.sizesCreate(params?.storeId)}>
                <Button variant="primary" className='bg-gray-500 hover:bg-gray-600'>
                  <Plus />
                  Add Size
                </Button>
              </Link>
            </div>
          </div>
          <div className={styles.table}>
            <DataTable
              columns={SizeColumns}
              data={formattedSizes}
              filterKey="value"
            />
          </div>
        </>
      )}
    </div>
  );
}
