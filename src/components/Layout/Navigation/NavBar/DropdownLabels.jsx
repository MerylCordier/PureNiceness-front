import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import fetchData from '../../../../services/api/call.api';
import Dropdown from '../../../Common/Dropdown';

function DropdownLabel() {
  const [labels, setLabels] = useState([]);
  const fetchLabels = async () => {
    const labelsData = await fetchData('GET', 'labels');
    const labelName = labelsData.map((label) => label.name);
    const labelLinks = [
    // { id: 1, path: '/labels/1', label: labelName[0] },
      { id: 2, path: '/labels/2', label: labelName[1] },
      { id: 3, path: '/labels/3', label: labelName[2] },
      // lien vers toutes les musiques: page non fonctionnelle
      // { id: 4, path: '/labels', label: 'all Records' },

    ];
    setLabels(labelLinks);
  };

  useEffect(() => {
    fetchLabels();
  }, []);

  return (
    <Dropdown title="Musiques" icon={faMusic} links={labels} />
  );
}

export default DropdownLabel;
