import React from 'react';

import Modal from 'react-native-modal';


const BottomModal = ({
  showOption = true,
  closemodal = () => {},
  onProceed = () => {},
  Loading = false,
}) => {
  const { colors } = useTheme();

  // Static data
  const dataSource = [
    { name: 'Option 1', checked: false, labelToshow: 'labelToshow1' },
    { name: 'Option 2', checked: true, labelToshow: 'labelToshow2' },
    { name: 'Option 3', checked: false, labelToshow: 'labelToshow3' },
  ];

  const keyToshowName = 'labelToshow';

  return (
    <Modal
      isVisible={showOption}
      transparent={true}
      style={[styles.bottomModal]}
    >
      {/* ... rest of the component code remains the same */}
    </Modal>
  );
};

export { BottomModal };
