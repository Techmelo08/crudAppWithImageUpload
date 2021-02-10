import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Mytextinput from './Mytextinput';
import Mybutton from './Mybutton';
import {registerStudent, fetchStudents} from '../store/actions/studentsAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ImagePicker from 'react-native-image-picker/lib/commonjs';

class AddStudents extends Component {
  static navigationOptions = {
    title: 'Add Students',
  };

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      RollNumber: '',
      student_Name: '',
      age: '',
      student_id: '',
      getAllStudents: '',
      Picture: '',
      filePath: '',
      getfunction: '',
    };
  }

  async componentDidMount() {}

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
          this.setState({Picture: source});
          console.log('this.state.Picture', this.state.Picture);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  async inserStudent() {
    let data = new FormData();
    var photo = {
      uri: this.state.Picture.uri,
      name: this.state.student_Name + '.jpg',
      type: 'image/jpg',
    };

    data.append('RollNumber', this.state.RollNumber);
    data.append('student_Name', this.state.student_Name);
    data.append('age', this.state.age);
    data.append('image', photo);
    let result = this.props.registerStudent(data);
    console.log('result', result);
    let fetchStudents = await this.props.fetchStudents();
    await console.log(fetchStudents);
    console.log('this.props', this.props);
    Alert.alert('Success', 'Data Save Successfully', [
      {
        text: 'Ok',

        onPress: () => {
          this.props.navigation.navigate('AllStudents');
        },
      },
    ]);
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View>
          <Mytextinput
            placeholder="Enter Roll no"
            onChangeText={RollNumber => this.setState({RollNumber})}
            style={{padding: 10}}
          />
          <Mytextinput
            placeholder="Enter Name"
            onChangeText={student_Name => this.setState({student_Name})}
            style={{padding: 10}}
          />
          <Mytextinput
            placeholder="Enter Age"
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
              <Image
                source={{uri: this.state.Picture.uri}}
                style={{
                  height: 90,
                  width: 140,
                  borderRadius: 20,
                }}
              />
            </TouchableOpacity>
          </View>
          <Mybutton
            title="Save"
            customClick={() => {
              this.inserStudent(),
                this.props.navigation.state.params.function();
            }}
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
  textStyle: {
    padding: 10,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  imageViewContainer: {
    width: 300,
    height: 300,
    borderRadius: 2,
    borderWidth: 0.8,
    borderColor: 'lightgray',
  },
});

function mapStateToProps(state) {
  //console.log('state====', await state.students.students);
  return {
    students: state.students,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({registerStudent, fetchStudents}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddStudents);
