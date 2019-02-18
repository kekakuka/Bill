<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Daily extends Model
{
    protected $fillable = [
        'user_id','id'
    ];
    public function user()
    {
        return $this->belongsTo('App\User', 'user_id','id');
    }

    public function details(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany('App\Detail');
    }

    public  function totalOfTheDay(){
        $total=0;
        foreach ($this->details as $detail) {
            $total+=$detail->Bonus-$detail->Cost;
        }
        return $total;
    }
}
