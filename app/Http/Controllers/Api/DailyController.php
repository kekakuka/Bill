<?php

namespace App\Http\Controllers\Api;

use App\Daily;
use App\Detail;
use App\User;
use Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Session;

class DailyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {

   $user=User::find($id);
   $dailies=$user->dailies;
      $dailies =  $dailies->sortByDesc('id');
       $dailies= $dailies->values()->all();
       foreach ($dailies as $daily ){
        data_fill($daily, 'details', $daily->details);
        }


        return response()->json($dailies);
    }


    public function showUserAmount($id){

        $amount=User::find($id)->Amount;
        return response()->json($amount);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $user_id=$request->input('user_id');
        $long_id=$user_id;
       if($user_id<10){
           $long_id='10000'.$user_id;
       }
       elseif($user_id>9){
           $long_id='1000'.$user_id;
       }
       elseif($user_id>99){
           $long_id='100'.$user_id;
       }
       elseif($user_id>999){
           $long_id='10'.$user_id;
       }
        $intDate=(int)str_replace('-','',$request->input('date'));
        $int_id=$long_id.$intDate;
        $theDaily=null;
        $dailies=Daily::all();
        foreach ($dailies as  $daily){
            if( $int_id==$daily->id){
                $theDaily=$daily;
                break;
            }
        }
        if($theDaily===null){
            $theDaily=new Daily([
                'id'=> $int_id,
                'TheDate'=>$intDate,
                'user_id'=>$user_id
            ]);
            $theDaily->save();
        }
        $isCost=false;
        if($request->get('category')==='Cost'){
            $isCost=true;
        }

        if($isCost){
        $detail = new Detail([
            'daily_id' => $int_id,
            'Cost' => $request->input('money'),
            'Notes' => $request->input('notes')
        ]);
            $this->ChangeAmount($detail->Cost,$detail);
        }
        else{
            $detail = new Detail([
                'daily_id' => $int_id,
                'Income' => $request->input('money'),
                'Notes' => $request->input('notes')
            ]);
            $this->ChangeAmount(-$detail->Income,$detail);
        }
        $detail->save();

        return response()->json('Saved Successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    public function ChangeAmount($number, $detail){
        $daily=Daily::find($detail->daily_id);
        $user=User::find( $daily->user_id);
        DB::table('users')
            ->where('id',$user->id)
            ->update(['Amount' => $user->Amount-$number]);

        DB::table('dailies')
            ->where('id',$daily->id)
            ->update(['DailyTotal' => $daily->DailyTotal-$number]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $detail=  Detail::find($id);
       $daily_id=$detail->daily_id;
       if($detail->Cost>0){ $this->ChangeAmount(-$detail->Cost,$detail);}
       else{ $this->ChangeAmount($detail->Income,$detail);}
        Detail::destroy($id);
       $daily=Daily::find($daily_id);
       if($daily->details->count()===0){
       Daily::destroy($daily_id);
  }
        return $detail;
    }
}
