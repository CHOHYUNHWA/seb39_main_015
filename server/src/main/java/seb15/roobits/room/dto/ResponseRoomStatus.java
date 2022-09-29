package seb15.roobits.room.dto;

import lombok.Getter;
import lombok.Setter;
import seb15.roobits.room.entity.Room;
import seb15.roobits.room.entity.RoomStatus;


@Getter
@Setter
public class ResponseRoomStatus {
    private RoomStatus roomStatus;

    public ResponseRoomStatus(RoomStatus roomStatus) {
        this.roomStatus = roomStatus;
    }
}