import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import { styles } from "./styles";

// Components
import AppBar from '../../components/AppBar';
import Ratings from '../../components/Ratings';

const JobDetailsScreen = () => {
  return (
    <View style={styles.container}>
      <AppBar title="Job Details" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Job Info Section */}

        <Text style={styles.sectionTitle}>Job Information</Text>
        <View style={styles.sectionContent}>
          <View style={styles.jobInfoHeader}>
            <Text style={styles.title}>
              Parent Job : <Text style={styles.value}>20002221</Text>
            </Text>
            <Text style={styles.title}>
              Master Job : <Text style={styles.value}>20021112</Text>
            </Text>
          </View>
          <Text style={styles.jobInfoText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            facilisi. Proin tincidunt ligula non ullamcorper bibendum. Integer
            ullamcorper lorem vel nunc tincidunt, vel venenatis tortor aliquam.
          </Text>
          <Text style={styles.title}>
            Priority : <Text style={styles.value}>High</Text>
          </Text>
        </View>

        {/* Customer Info Section */}

        <Text style={styles.sectionTitle}>Customer Info</Text>
        <View style={styles.sectionContent}>
          <Text style={styles.title}>
            Customer Name : <Text style={styles.value}>Jason Smith</Text>
          </Text>
          <Text style={styles.title}>
            Customer Location :{' '}
            <Text style={styles.value}>204 2nd St, Hoboken, New York City</Text>
          </Text>
          <Text style={styles.title}>
            Customer Phone No : <Text style={styles.value}>50550 85888</Text>
          </Text>
        </View>

        {/* Customer Info Section */}

        <Text style={styles.sectionTitle}>Workers</Text>
        <View style={styles.sectionContent}>
          <Text style={styles.title}>
            No of People in Job : <Text style={styles.value}>2</Text>
          </Text>
          <Text style={styles.title}>
            Worker 1 : <Text style={styles.value}>John Smith</Text>
          </Text>
          <Text style={styles.title}>
            Worker 2 : <Text style={styles.value}>Jaons</Text>
          </Text>
        </View>

        {/* Attachment Section */}

        <Text style={styles.sectionTitle}>Attachments</Text>
        <View style={styles.sectionContent}>
          <Text style={styles.sectionText}>
            {/* dynamic */}
            Job Document 526351524.docs
          </Text>
        </View>

        {/* Signature Section */}

        <Text style={styles.sectionTitle}>Signature</Text>
        <View style={styles.sectionContent}>
          <View style={styles.signatureBox}></View>
        </View>

        {/* Rating Section */}

        <Text style={styles.sectionTitle}>Rating</Text>
        <View style={styles.sectionContent}>
          <Ratings />
          <Text style={styles.jobInfoText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            facilisi. Proin tincidunt ligula non ullamcorper bibendum. Integer
            ullamcorper lorem vel nunc tincidunt, vel venenatis tortor aliquam.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};



export default JobDetailsScreen;

// //
