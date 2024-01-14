import styled from "styled-components/native";
import {Button} from "react-native";
import {DOMEN} from "../consts";


const Post = ({navigation, id, name, item}) => {

    const image = `http://${DOMEN}/api/services/${item.id}/image/`

    const handlePress = () => {
        navigation.navigate("FullPost", {id: id, name: name });
    };

    return (
        <PostView>
            <PostDetails>
                <PostImage source={{uri: image}} />
                <PostRightDetails>
                    <PostTitleContainer>
                        <PostTitle>{name}</PostTitle>
                    </PostTitleContainer>
                    <PostButton>
                        <Button title='Открыть' onPress={handlePress} color="#D386F3" />
                    </PostButton>
                </PostRightDetails>
            </PostDetails>
        </PostView>
    )
}


const PostView = styled.View`
  flex-direction: column;
  gap: 15px;
  padding: 15px;
  margin: 15px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.1);
  border-style: solid;
  border-radius: 5px;
`

const PostImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  margin-right: 12px;
`

const PostTitleContainer = styled.Text`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const PostTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
`

const PostDetails = styled.View`
  flex-direction: row;
`
const PostRightDetails = styled.View`
  flex-direction: column;
  flex: 1;
  gap: 20px;
`

const PostButton = styled.View`
  flex: 1;
  justify-content: center;
  align-content: center;
`

export default Post;