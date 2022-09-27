package seb15.roobits.roobit.controller;


import seb15.roobits.globaldto.SingleResponseDto;
import seb15.roobits.roobit.dto.RoobitPostDto;
import seb15.roobits.roobit.service.RoobitService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb15.roobits.roobit.entity.Roobit;
import seb15.roobits.roobit.mapper.RoobitMapper;
import seb15.roobits.room.service.RoomService;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/roobits")
@Validated
public class RoobitController{
    private final RoobitService roobitService;
    private final RoobitMapper mapper;
    private  final RoomService roomService;

    public RoobitController(RoobitService roobitService, RoobitMapper mapper, RoomService roomService){
        this.roobitService = roobitService;
        this.mapper = mapper;
        this.roomService = roomService;
    }

    @PostMapping("/post")  // 루빗 작성
    public ResponseEntity postRoobit(@Valid @RequestBody RoobitPostDto roobitPostDto) {
        Roobit roobit = roobitService.createRoobit(mapper.roobitPostDtoToRoobit(roobitPostDto));
        return new ResponseEntity<>(mapper.roobitToRoobitIdResponseDto(roobit), HttpStatus.CREATED);
    }

    @GetMapping("/get/{roobit-id}")   // 특정 루빗 하나만 열람 (공개 중인 루빗만 열림)  (0927YU)
    public ResponseEntity getRoobit(@PathVariable("roobit-id") @Positive long roobitId) {
        Roobit roobit = roobitService.findRoobit(roobitId);
        Roobit.RoobitStatus roobitStatus = roobit.getRoobitStatus();
        if (roobitStatus.getStatusNumber() == 2) {    //  2 = 공개 중, 디데이
            return new ResponseEntity<>(
                    new roobits.dto.SingleResponseDto<>(mapper.roobitToRoobitResponseDto(roobit)), HttpStatus.OK);
        }
        else {return null;}
    }

    @GetMapping("/search")
    public ResponseEntity searchRoobit(@PathVariable("roobit-id") @Positive long roobitId) {

        return null;
    }

//    @GetMapping("/manager/get/{room-id}")
//    public ResponseEntity getRoobits(@Positive @RequestParam int page,
//                                     @Positive @RequestParam int size) {
//        Page<Roobit> pageRoobits = roobitService.findRoobits(page - 1, size);
//        List<Roobit> roobits = pageRoobits.getContent();
//        return new ResponseEntity<>(
//                new MultiResponseDto<>(mapper.roobitsToRoobitResponsesDtos(roobits),pageRoobits),
//                        HttpStatus.OK);
//    }

//    @DeleteMapping("/manager/delete/{roobit-id}")
//    public ResponseEntity cancelQuestion(@PathVariable("roobit-id") @Positive long roobitId) {
//        roobitService.deleteRoobit(roobitId);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }

}