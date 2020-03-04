import React, {Component} from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {pictures} from '../constants/constant';
import  '../App.css'
const ImageContainer = SortableContainer(({pictures}) => {
    return (
        <div className="img-wrap">
            <h2>Image Drag and Drop</h2>
            {pictures.map((value, index) => (
                <Images key={index} index={index} value={value} />
            ))}
        </div>
    );
});

const Images = SortableElement(({value}) => <div className="img">
    <center>
    <img src={value} className={'img-container'}/>
    </center>
</div>);

export default class ImageGallery extends Component {
    state = {
        pictures: pictures
    };

    onSortEnd = ({oldIndex, newIndex}) => {
        if(oldIndex !== newIndex){
            confirmAlert({
                title: 'Confirm to move',
                message: 'Are you sure to do this.',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            this.setState(({pictures}) => ({
                                pictures: arrayMove(pictures, oldIndex, newIndex),
                            }));
                        }
                    },
                    {
                        label: 'No',
                        onClick: () => console.log("Can't move")
                    }
                ]
            });
        }
    };

    render() {
        return <ImageContainer pictures={this.state.pictures} onSortEnd={this.onSortEnd} />;
    }
}
