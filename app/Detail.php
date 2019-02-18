<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Detail extends Model
{
    protected $fillable = [
        'daily_id','Cost','Income','Notes'
    ];
    public function daily()
    {
        return $this->belongsTo('App\Daily', 'daily_id','id');
    }
}
