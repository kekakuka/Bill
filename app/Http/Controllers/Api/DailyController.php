<?php

namespace App\Http\Controllers\Api;

use App\Daily;
use App\Detail;
use App\User;
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
    public function index()
    {
        $dailies = Daily::all();
       foreach ($dailies as $daily ){
        data_fill($daily, 'details', $daily->details);
        }
        return response()->json($dailies);
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
        //
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
