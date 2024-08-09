import React, { useRef } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, TouchableOpacity, Alert } from 'react-native';
import PDFView from 'react-native-pdf';
import { moderateScale } from 'react-native-size-matters';

import { useDispatch, useSelector } from 'react-redux';
import { COLOR } from '../../utilities/colors';
import { hidePdfViewer } from './pdfViewrReducer';
import { hideSnackbar, showSnackbar } from '../customSnackbar/customSnackbarSlice';

const PdfViewer = () => {
  const pdfRef = useRef(null);
  const dispatch = useDispatch();

  const { visible, pdfData } = useSelector(state => state.pdfViewer);

  // HANDLE CLOSE BUTTON
  const handleCloseButton = () => {

    dispatch(hidePdfViewer());

    
  };

  //HANDLE ERROR
const handleError = (error) => {
    dispatch(showSnackbar({ message: "Sorry, we can't view this document. Only PDF format is supported.", color: "red" }));
    dispatch(hidePdfViewer());

  };
  

  return (
    visible && pdfData && (
      <View style={styles.container}>
        <PDFView
          onError={handleError}
          ref={pdfRef}
          source={{ uri: `data:application/pdf;base64,${pdfData}` }}
          style={styles.pdf}
          fadeInDuration={250}
          scrollEnabled={true}
          zoomEnabled={true}
          pageStartingNumber={1}
        />
        <TouchableOpacity style={styles.closeButton} onPress={handleCloseButton}>
          <Image source={require("../../../assets/icons/close_red.png")} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: moderateScale(10),
  },
  pdf: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: moderateScale(15),
  },
  closeButton: {
    height: moderateScale(30),
    width: moderateScale(30),
    backgroundColor: COLOR.GREY_ONE,
    position: 'absolute',
    top: moderateScale(15),
    borderRadius: 30,
    right: moderateScale(20),
    padding: moderateScale(4),
  },
  closeIcon: {
    height: '100%',
    width: '100%',
    flex: 1,
    resizeMode: 'contain',
  },
});

export default PdfViewer;
