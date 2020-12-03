import React from 'react';
import { useParams } from 'react-router-dom';
import ServiceAccount from '../../lib/k8s/serviceAccount';
import { Link } from '../common';
import { MainInfoSection } from '../common/Resource';

export default function ServiceAccountDetails() {
  const { namespace, name } = useParams();
  const [item, setItem] = React.useState<ServiceAccount | null>(null);

  ServiceAccount.useApiGet(setItem, name, namespace);

  return (
    <MainInfoSection
      resource={item}
      extraInfo={item && [
        {
          name: 'Secrets',
          value: item.secrets.map(({name}, index) => <React.Fragment key={`${name}__${index}`}>
            <Link routeName={'secret'} params={{namespace, name}}>
              {name}
            </Link>
            {index !== item.secrets.length - 1 && ','}
          </React.Fragment>
          )
        }
      ]}
    />
  );
}
