import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchStudents, deleteStudent} from '../store/actions/studentsAction';
console.disableYellowBox = true;

class AllStudents extends Component {
  static navigationOptions = {
    title: 'All Student',
    headerStyle: {
      backgroundColor: '#616161',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    getAllStudents: [],
  };

  async componentDidMount() {
    //console.log('this.props.students.data', this.props.students.data);

    this.getStudentData();
  }

  // async getStudentData() {
  //   let data = await this.props.fetchStudents();
  //   //console.log('data', await data.payload);
  //   let x = await data.payload;
  //   this.setState({
  //     getAllStudents: x,
  //   });
  async getStudentData() {
    console.log('called');
    let data = await this.props.fetchStudents();
    let data1 = await data.payload;
    let data2 = await data1.data;
    console.log('this.props', this.props);
    this.setState({
      getAllStudents: data2,
    });
    console.log('this.state.getAllStudents', await this.state.getAllStudents);
  }
  studentDelete = async student_id => {
    let data = await this.props.deleteStudent(student_id);
    console.log('data', data);
    this.getStudentData();
  };
  render() {
    //let {getAllStudents} = this.state;

    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={{backgroundColor: '#fff'}}>
          <FlatList
            data={
              this.state.getAllStudents.length
                ? this.props.students.data
                  ? this.props.students.data
                  : null
                : this.state.getAllStudents
            }
            extraData={this.state.getAllStudents}
            ItemSeparatorComponent={this.ListViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: 100, height: 100, margin: 10}}>
                    <Image
                      source={{
                        uri: 'http://192.168.10.6:8041/' + item.image,
                      }}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 60,
                      }}
                    />
                  </View>

                  <View style={{marginTop: 10}}>
                    <Text style={styles.title}>Roll#: {item.RollNumber}</Text>
                    <Text style={styles.title}>Name: {item.student_Name}</Text>
                    <Text style={styles.title}>Age: {item.age}</Text>
                    <View
                      style={{
                        alignSelf: 'flex-end',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          navigate('UpdateStudens', {
                            data: item,
                            function: this.getStudentData,
                          })
                        }>
                        <Text>Update</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.studentDelete(item.student_id)}>
                        <Text style={{marginLeft: 15}}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </ScrollView>
        <View style={styles.btn}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigate('AddStudents', {function: this.getStudentData})
            }>
            <Text style={styles.btntext}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btntext: {
    marginLeft: 280,
    fontSize: 25,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    color: '#000000',
  },
});

function mapStateToProps(state) {
  // console.log('state====', state);
  return {
    students: state.students,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchStudents, deleteStudent}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllStudents);
