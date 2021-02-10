import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import Mytextinput from './Mytextinput';
import Mybutton from './Mybutton';
import {updateStudent} from '../store/actions/studentsAction';
import ImagePicker from 'react-native-image-picker/lib/commonjs';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class UpdateStudens extends Component {
  static navigationOptions = {
    title: 'Update Students',
  };
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      student_id: '',
      flag: 0,
      RollNumber: this.props.navigation.state.params.data.RollNumber,
      student_Name: this.props.navigation.state.params.data.student_Name,
      age: this.props.navigation.state.params.data.age,
      Picture: this.props.navigation.state.params.data.image,
    };
  }

  componentDidMount() {
    console.log('this.props', this.state);
    console.log('this.getData', this.props.navigation.state.params.function);
  }

  async studentUpdateRecord() {
    //console.log('this.props', await this.props.students);
    let updatdata = new FormData();
    var photo = {
      uri: this.state.Picture.uri,
      name: this.state.student_Name + '.jpg',
      type: 'image/jpg',
    };

    updatdata.append('RollNumber', this.state.RollNumber);
    updatdata.append('student_Name', this.state.student_Name);
    updatdata.append('age', this.state.age);
    updatdata.append('image', photo);
    let student_id = this.props.navigation.state.params.data.student_id;
    // console.log('student_id====>>', student_id);
    let data = await this.props.updateStudent(student_id, updatdata);
    console.log('data===' + data);
  }

  launchLibrary = () => {
    var options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxHeight: 350,
      maxWidth: 350,
    };
    try {
      ImagePicker.launchImageLibrary(options, response => {
        if (response !== null) {
          const source = {uri: response.uri};
          if (source) {
            this.setState({flag: 1, Picture: source});
            console.log('State =', this.state);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View>
          <Mytextinput
            value={this.state.RollNumber}
            onChangeText={RollNumber => this.setState({RollNumber})}
            style={{padding: 10}}
          />
          <Mytextinput
            value={this.state.student_Name}
            onChangeText={student_Name => this.setState({student_Name})}
            style={{padding: 10}}
          />
          <Mytextinput
            value={this.state.age.toString()}
            onChangeText={age => this.setState({age})}
            style={{padding: 10}}
          />
          <View>
            <TouchableOpacity
              onPress={this.launchLibrary}
              style={{
                width: 150,
                height: 100,
                marginLeft: 35,
                borderRadius: 20,
                backgroundColor: '#fafafa',
                marginTop: 10,
                borderWidth: 2,
                borderColor: '#795548',
                alignItems: 'center',
                alignContent: 'center',
                borderColor: 'green',
              }}>
              {this.state.Picture ? (
                this.state.flag == 0 ? (
                  <Image
                    source={{
                      uri: 'http://192.168.10.6:8041/' + this.state.Picture,
                    }}
                    style={{
                      width: 140,
                      height: 90,
                      borderRadius: 20,
                    }}
                  />
                ) : (
                  <Image
                    source={{
                      uri: this.state.Picture.uri,
                    }}
                    style={{
                      width: 140,
                      height: 90,
                      borderRadius: 20,
                    }}
                  />
                )
              ) : (
                <View />
              )}
            </TouchableOpacity>
          </View>

          <Mybutton
            title="Update"
            customClick={() => this.studentUpdateRecord()}
          />
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
});

function mapStateToProps(state) {
  //console.log('state====', await state.students.students);
  return {
    students: state.students.students,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({updateStudent}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateStudens);
