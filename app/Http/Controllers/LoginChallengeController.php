<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginChallengeController extends Controller
{
    
    private $words = ['Laravel', 'React', 'Logic', 'Code', 'Future', 'Secure', 'Web', 'Data'];

    public function getChallenge()
    {
         $lastUsedPassword = session('last_successful_password');

        do {
             $randomWord = $this->words[array_rand($this->words)];
            
            $expectedPassword = strlen($randomWord) * 5 + 1;

         
        } while ($expectedPassword == $lastUsedPassword && count($this->words) > 1);
        
        session()->put('expected_password', $expectedPassword);
        session()->save();

        return response()->json([
            'word' => $randomWord
        ]);
    }

    public function login(Request $request)
    {
        $request->validate(['password' => 'required|numeric']);

        $correctPassword = session('expected_password');

        if ($request->password == $correctPassword) {
            
          
            session()->put('last_successful_password', $correctPassword);
            session()->save();
            // ---------------------------

            return response()->json(['status' => 'success', 'message' => 'تم تسجيل الدخول بنجاح! ولن يتكرر هذا الرقم فوراً.']);
        }

        return response()->json(['status' => 'error', 'message' => 'كلمة المرور خاطئة.'], 401);
    }
}